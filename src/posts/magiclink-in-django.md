---
title: "Secure Passwordless Magic Link Login in Django (from Scratch)"
date: "2025-07-29"
description: "Learn how to implement a secure, passwordless magic link login system in Django using sessions and email verification. Perfect for internal tools or MVPs."
tags: ["Django", "Authentication", "Security"]
coverImage: "/cover-images/django.png"
author: "Pranav Tripathi"
---

## ✨ Introduction

### Why Passwords Are Getting Obsolete?

#### From Users' Perspective:

* **Cognitive Burden:** Remembering multiple complex passwords is difficult and frustrating. Users tend to reuse or choose weak passwords.
* **Password Fatigue:** Regularly changing complex passwords leads to burnout, forgotten passwords, or insecure habits like writing them down.
* **Poor Security Practices:** Many users use common passwords (e.g., `123456`, `password`) or reuse them across platforms.

#### From Developers' Perspective:

* **Security Risks:** Storing password hashes increases the risk surface during data breaches.
* **Maintenance Overhead:** Handling secure password storage, resets, and complexity rules adds complexity.
* **Compliance Risks:** Mishandling passwords can lead to regulatory and reputational issues.

### Why Magic Links Are Better

* **Simplified UX:** Users just click a link in their email to log in.
* **Improved Security:** Links are unique, cryptographically signed, and time-limited.
* **Simplified Dev Experience:** No need for password storage, resets, or security rules.


## 💻 What Are We Building?

A Django web app with:

* Email-only, passwordless login
* Session-based authentication
* Magic link-based access (sent via email)
* Allowed users listed in environment variables


## ⚖️ Pre-requisites

* Basic Django: views, forms, URLs
* Python: virtualenv, pip
* Understanding of mail backends
* Basic knowledge of Django sessions


## 👨‍💻 Project Setup

### 1. Create Django Project & App

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install django python-dotenv

django-admin startproject my_project .
python manage.py startapp my_app
```

### 2. Project Structure

```
the-django-app/
├── my_app/            # Django app
├── my_project/        # Project config
├── templates/         # HTML templates
├── .env               # Allowed emails
└── manage.py
```

### 3. Update `settings.py`

```python
INSTALLED_APPS = [
    ...
    'my_app',
    'django.contrib.sessions',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    ...
]
```

### 4. Add `.env` File

```
CREDENTIALS=["abc@example.com", "dev@example.com"]
```

> Add `.env` to your `.gitignore`!

### 5. Load .env in `settings.py`

```python
import os, json
from dotenv import load_dotenv

load_dotenv()
CREDENTIALS = json.loads(os.getenv("CREDENTIALS", "[]"))
```

### 6. Setup Templates

```bash
mkdir templates
```

```python
TEMPLATES = [{
    ...
    'DIRS': [BASE_DIR / "templates"],
    ...
}]
```

### 7. Migrate & Run Server

```bash
python manage.py migrate
python manage.py runserver
```

Visit [http://localhost:8000/](http://localhost:8000/)


## 🔐 Magic Link Login Flow

### 1. Create Login Form

`my_app/forms.py`

```python
from django import forms

class EmailOnlyLoginForm(forms.Form):
    email = forms.EmailField()
```

### 2. Secure Token Generation Using TimestampSigner

* Uses Django's `TimestampSigner` to create time-limited tokens.
* Token format: `email:timestamp:signature`

### 3. Views: Send & Verify Token

`my_app/views.py`

```python
from django.shortcuts import render, redirect
from django.core.signing import TimestampSigner, SignatureExpired, BadSignature
from django.core.mail import send_mail
from django.urls import reverse
from .forms import EmailOnlyLoginForm
from django.conf import settings

signer = TimestampSigner()

def login_view(request):
    error = ""
    if request.method == "POST":
        form = EmailOnlyLoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            if email in settings.CREDENTIALS:
                token = signer.sign(email)
                verify_url = request.build_absolute_uri(
                    reverse("verify") + f"?token={token}"
                )
                send_mail(
                    "Your Magic Login Link",
                    f"Click to log in: {verify_url}",
                    "no-reply@example.com",
                    [email],
                )
                request.session["pending_email"] = email
                return render(request, "magic_sent.html")
            else:
                error = "Email not recognized"
    else:
        form = EmailOnlyLoginForm()
    return render(request, "login.html", {"form": form, "error": error})

def verify_view(request):
    token = request.GET.get("token")
    try:
        email = signer.unsign(token, max_age=300)
        if request.session.get("pending_email") == email:
            request.session["authenticated_user"] = email
            return redirect("home")
    except (SignatureExpired, BadSignature):
        return render(request, "magic_expired.html")
    return redirect("login")

def logout_view(request):
    request.session.flush()
    return redirect("login")
```

### 4. Email Backend Setup

#### Development (Console Backend)

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

#### Production (Gmail)

```python
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'your_email@gmail.com'
EMAIL_HOST_PASSWORD = 'your_app_specific_password'
DEFAULT_FROM_EMAIL = 'your_email@gmail.com'
```

`.env`

```
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_specific_password
```

> Use App Passwords or services like SendGrid for production!


## 👤 How Session-Based Login Works

* On success, we store: `request.session['authenticated_user'] = email`
* Django issues a signed `sessionid` cookie
* All sensitive data is stored server-side in `django_session`
* Logging out: `request.session.flush()`


## 🚪 Protecting Views Using Custom Middleware

`my_app/middleware.py`

```python
from django.shortcuts import redirect

EXEMPT_PATHS = [
    '/login/',
    '/verify/',
    '/static/',
    '/favicon.ico',
]

class AuthSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if any(request.path.startswith(path) for path in EXEMPT_PATHS):
            return self.get_response(request)

        if not request.session.get('authenticated_user'):
            return redirect('login')

        return self.get_response(request)
```

Add to `settings.py` **after** `SessionMiddleware`:

```python
MIDDLEWARE = [
    ...
    'django.contrib.sessions.middleware.SessionMiddleware',
    'my_app.middleware.AuthSessionMiddleware',
    ...
]
```


## 🔒 Security Best Practices

* Keep token expiry short (e.g., 5-15 minutes)
* Use HTTPS in production
* Never commit `.env` to version control
* Use secure session and cookie settings
* Consider email rate-limiting to prevent abuse


## 📃 Further Reading (Django Docs)

* [Sessions Framework](https://docs.djangoproject.com/en/stable/topics/http/sessions/)
* [Signing and Token Security](https://docs.djangoproject.com/en/stable/topics/signing/)
* [Email Sending](https://docs.djangoproject.com/en/stable/topics/email/)
* [Middleware](https://docs.djangoproject.com/en/stable/topics/http/middleware/)
* [URL Reversing](https://docs.djangoproject.com/en/stable/ref/urlresolvers/)


## 🚀 Conclusion

Magic link login offers a simpler and safer alternative to traditional password-based authentication. By leveraging Django's native tools, you can build a secure, maintainable, and delightful login experience — ideal for internal tools, MVPs, or small apps.

No passwords. No users table. Just clean, secure access.

