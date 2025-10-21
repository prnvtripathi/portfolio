---
title: "Secure Passwordless Magic Link Login in Django (from Scratch)"
date: "2025-07-29"
description: "Learn how to implement a secure, passwordless magic link login system in Django using sessions and email verification. Perfect for internal tools or MVPs."
tags: ["Django", "Authentication", "Security"]
coverImage: "/cover-images/django.png"
author: "Pranav Tripathi"
---

## The Problem I Didn't Know I Had

A few months ago, I started contributing to an open-source organization called Monkeys. They were running a blogging platform and needed an admin dashboard-something to manage posts, moderate content, and handle all those behind-the-scenes tasks that keep a platform running smoothly. I volunteered to build it.

My first instinct? Django. It's battle-tested, has everything built-in, and I could ship something functional quickly. But then came the authentication question.

I sat there, staring at my screen, thinking about implementing yet another password-based auth system. Create a User model, hash passwords, build a password reset flow, enforce complexity rules... and suddenly, I felt exhausted before I'd even started.

That's when I realized: **passwords are exhausting**.

## Why I Wanted to Ditch Passwords

Let me be honest—I hate managing passwords, both as a user and as a developer.

As a **user**, I'm constantly:
- Forgetting which password I used for which service
- Getting locked out because I mixed up "MyPassword123!" with "MyPassword123!!" 
- Reusing passwords because remembering 50+ unique ones is humanly impossible
- Writing them down in a notes app (which defeats the whole security thing)

As a **developer**, passwords mean:
- Storing hashed passwords and worrying about breach scenarios
- Building password reset flows that nobody enjoys
- Implementing complexity rules that annoy users
- Maintaining all of this when I just want to build features

For an internal admin dashboard at The Monkeys, this felt like overkill. We had maybe 5-7 trusted team members who needed access. Why was I about to implement an enterprise-grade authentication system for that?

## Discovering the Magic Link Solution

I started researching alternatives and stumbled upon magic links—the same thing Slack, Notion, and Medium use. You enter your email, get a link, click it, and you're in. No passwords. No "confirm password" field. No password strength meter turning red at me.

The more I thought about it, the more it made sense for my use case:
- **Simple UX**: Team members just click a link from their email
- **Better security**: Each link is unique, cryptographically signed, and expires quickly
- **Less code**: No password hashing, no reset flows, no complexity validation
- **Perfect for small teams**: I could hardcode allowed emails and be done with it

This felt like the right level of security for an internal tool—not under-engineered, not over-engineered, just right.

## What I Built

The dashboard was straightforward: an email-only, passwordless login system using Django's built-in session framework and cryptographic signing. Here's how it worked:

1. Admin enters their email
2. System generates a time-limited, signed token
3. Magic link gets sent via email
4. Admin clicks link, gets authenticated
5. Session starts, admin can access the dashboard

The beauty? Django already had all the tools I needed. No external packages, no OAuth complexity, just leveraging what was already there.

## The Technical Implementation

### Setting Up the Foundation

I started with a basic Django setup:

```bash
python -m venv venv
source venv/bin/activate
pip install django python-dotenv

django-admin startproject admin_dashboard .
python manage.py startapp auth_app
```

I wanted to keep the allowed emails in an environment variable for easy management:

```
# .env
CREDENTIALS=["admin@monkeys.com.co", "editor@monkeys.com.co"]
```

Then loaded it in settings:

```python
import os, json
from dotenv import load_dotenv

load_dotenv()
CREDENTIALS = json.loads(os.getenv("CREDENTIALS", "[]"))
```

### The Login Form

I kept it minimal—just an email field:

```python
# auth_app/forms.py
from django import forms

class EmailOnlyLoginForm(forms.Form):
    email = forms.EmailField()
```

### The Core Logic

This is where the magic happens. Django's `TimestampSigner` does the heavy lifting—it creates tokens that are cryptographically signed and include a timestamp, so I can validate both authenticity and expiry:

```python
# auth_app/views.py
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
                    "no-reply@monkeys.com.co",
                    [email],
                )
                request.session["pending_email"] = email
                return render(request, "magic_sent.html")
            else:
                error = "Email not authorized"
    else:
        form = EmailOnlyLoginForm()
    return render(request, "login.html", {"form": form, "error": error})

def verify_view(request):
    token = request.GET.get("token")
    try:
        email = signer.unsign(token, max_age=300)  # 5 minute expiry
        if request.session.get("pending_email") == email:
            request.session["authenticated_user"] = email
            return redirect("dashboard")
    except (SignatureExpired, BadSignature):
        return render(request, "magic_expired.html")
    return redirect("login")

def logout_view(request):
    request.session.flush()
    return redirect("login")
```

The verify view does something clever: it checks both the token signature AND matches it against a `pending_email` stored in the session during login. This prevents someone from reusing an old valid token.

### Protecting the Dashboard

I wanted every page in the dashboard to require authentication, but I didn't want to add decorators to every single view. So I wrote custom middleware:

```python
# auth_app/middleware.py
from django.shortcuts import redirect

EXEMPT_PATHS = [
    '/login/',
    '/verify/',
    '/static/',
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

Then added it to settings:

```python
MIDDLEWARE = [
    ...
    'django.contrib.sessions.middleware.SessionMiddleware',
    'auth_app.middleware.AuthSessionMiddleware',
    ...
]
```

Now every view in my dashboard was automatically protected. If you're not authenticated, you get redirected to login. Simple.

## The Email Setup Journey

During development, I used Django's console email backend. Every time someone tried to log in, the magic link would just print to my terminal:

```python
# settings.py (development)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

This was perfect for testing—instant feedback, no configuration needed.

When I deployed to production, I switched to Gmail's SMTP:

```python
# settings.py (production)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('EMAIL_HOST_USER')
```

**Pro tip**: Use Gmail's App Passwords, not your regular password. I learned this the hard way when authentication kept failing.

## What I Learned About Sessions

Before this project, I had a vague understanding of how Django sessions worked. Building this forced me to really get it:

When someone successfully verifies their magic link, I store their email in the session:

```python
request.session["authenticated_user"] = email
```

Django then:
1. Generates a random session ID
2. Stores the session data server-side in the database
3. Sends the session ID to the browser as a signed cookie
4. Uses that cookie to retrieve session data on subsequent requests

All the sensitive data stays server-side. The browser just gets a random ID. When someone logs out, `request.session.flush()` destroys everything.

It's elegant, it's secure, and it's built into Django.

## Security Considerations I Had to Think Through

Building this made me think harder about security than I expected:

**Token expiry**: I set magic links to expire after 5 minutes. Long enough for someone to check their email and click, short enough to prevent abuse. In production, you might want 10-15 minutes depending on your team's email latency.

**HTTPS in production**: Magic links in plain HTTP are a terrible idea. Anyone intercepting the request gets full access. I made sure to deploy with HTTPS from day one.

**Rate limiting**: I didn't implement this initially, but in retrospect, I should have. Without rate limiting, someone could spam login requests and flood an admin's inbox. Django has packages like `django-ratelimit` that make this straightforward.

**Session security**: I enabled Django's secure cookie settings in production:

```python
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
```

**The .env file**: I almost committed my `.env` with real emails to git. Almost. Always, always, always add `.env` to `.gitignore`.

## What Went Surprisingly Well

The whole implementation took maybe 3-4 hours. Most of that was reading Django docs and testing edge cases. The actual code? Under 100 lines.

The team at The Monkeys loved it. No passwords to remember, no reset flows to support, just click a link and you're in. One editor told me it felt like "the dashboard just works"—which is probably the best compliment you can get for auth.

The maintenance burden is nearly zero. I haven't touched the auth code in months. It just works.

## What I'd Do Differently

If I were building this again, I'd add:

**Rate limiting from the start**: Even for internal tools, it's worth having. Prevents accidents and abuse.

**Better email templates**: My initial emails were plain text. HTML emails with a big "Log In" button would be more polished.

**Admin logging**: Tracking who logged in when would be useful for security audits. Django's logging framework makes this easy.

**Multiple allowed domains**: Right now, I hardcode emails. A better approach might be allowing any email from `@monkeys.com.co`. Would make onboarding new team members easier.

## Why This Approach Works for Internal Tools

This authentication pattern is perfect for:
- Admin dashboards with small, trusted teams
- Internal tools with known users
- MVPs where you want to ship fast
- Any situation where passwords feel like overkill

It's **not** ideal for:
- Public-facing applications with thousands of users
- Apps where email delivery is unreliable
- Situations requiring immediate access (magic links have inherent latency)
- High-security contexts needing 2FA

For the admin dashboard at The Monkeys, it hit the sweet spot: secure enough for our needs, simple enough to maintain, delightful enough for users.

## The Bigger Picture

Building this made me question a lot of assumptions I had about authentication. We default to passwords because that's what we know, not because they're the best solution.

For years, we've told users to create complex passwords, remember dozens of them, change them regularly, and never reuse them. Then we're surprised when they use "Password123!" everywhere.

Magic links aren't perfect, but they shift the security burden from human memory to cryptographic signatures and email infrastructure. For many use cases, that's a better trade-off.

## Resources That Helped Me

Django's documentation was invaluable:
- [Sessions Framework](https://docs.djangoproject.com/en/stable/topics/http/sessions/)
- [Signing and Token Security](https://docs.djangoproject.com/en/stable/topics/signing/)
- [Email Sending](https://docs.djangoproject.com/en/stable/topics/email/)
- [Middleware](https://docs.djangoproject.com/en/stable/topics/http/middleware/)

## Final Thoughts

Building this passwordless admin dashboard taught me that sometimes the best solution is the one that removes complexity rather than adding it. No user table, no password hashing, no reset flows—just clean, secure access through cryptographically signed magic links.

The Monkeys team has been using it for months now without issues. The code hasn't needed updates. Nobody's forgotten their password because there are no passwords to forget.

Sometimes, the best authentication system is the one your users don't have to think about.