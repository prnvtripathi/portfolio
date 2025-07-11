"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { motion } from "motion/react";
import CalComButton from "./cal-component";
import { ArrowRightIcon } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Label } from "./ui/label";
import VisitorCounter from "./visitor-count";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Successfully subscribed to the newsletter!");
    setEmail("");
  };

  interface EmailJSResponseStatus {
    text: string;
  }

  interface EmailJSParams {
    publicKey: string;
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_o1b9i7m",
        "template_pdd27nv",
        form.current as HTMLFormElement,
        { publicKey: "-AeaiHrYYlm043wqv" } as EmailJSParams
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.current?.reset();
        },
        (error: EmailJSResponseStatus) => {
          toast.error("Failed to send message. Please try again.");
          console.error(error.text);
        }
      );
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      id="contact"
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="section-heading" variants={itemVariants}>
        Get in Touch
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Work Inquiry</CardTitle>
              <CardDescription>
                Have a project in mind? Let's discuss how I can help bring your
                ideas to life.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" ref={form} onSubmit={submitForm}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from_name" className="text-sm font-medium">
                      Name
                    </Label>
                    <Input
                      id="from_name"
                      name="from_name"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="from_email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="from_email"
                      name="from_email"
                      type="email"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    className="resize-none"
                    placeholder="Tell me about your project..."
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  effect={"expandIcon"}
                  icon={ArrowRightIcon}
                  iconPlacement="right"
                  variant={"secondary"}
                  className="w-full mt-2 md:mt-0"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-8">
          <Card className="flex flex-col">
            {/* <CardHeader className="flex md:flex-row flex-col items-center justify-between"> */}
            <CardHeader className="flex flex-col items-center justify-between">
              <div className="space-y-2">
                <CardTitle>
                  Want to chat?{" "}
                  <span className="text-primary">Let's connect!</span>
                </CardTitle>
                <CardDescription>
                  Feel free to book a call with me to discuss your project.
                </CardDescription>
              </div>
              {/* <CalComButton /> */}
            </CardHeader>
            <CardContent className="flex justify-center">
              <CalComButton />
            </CardContent>
          </Card>
          <VisitorCounter />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
