import { Bell, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import CustomButton from "../CustomButton";

const Footer = () => {
  return (
    <main className="-mb-2 mt-10 w-full border-t px-4 py-4 shadow-inner">
      <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="mb-4 text-center md:mb-3 md:text-left">
          <Link href="/">
            <p className="text-center text-2xl font-semibold">Startek AU</p>
          </Link>
          <p className="mt-4 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Startek x{" "}
            <Link
              href="https://github.com/pawandai"
              className="hover:underline"
            >
              Pawandai
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2">Subscribe to Our Newsletter:</p>
          <input
            type="email"
            placeholder="Email Address"
            className="mb-2 rounded-md border-2 bg-transparent p-2 outline-none"
          />
          <CustomButton
            icon={
              <Bell className="group-hover:animate-wiggle text-secondary" />
            }
            title="Subscribe"
            className="group"
          />
        </div>
        <div className="mt-4 md:mt-0">
          <p className="mb-2 text-center md:text-left">Follow Us:</p>
          <div className="flex space-x-4 pb-4">
            <Link href="https://www.facebook.com/starteknp">
              <Facebook size={24} />
            </Link>
            <Link href="https://twitter.com/starteknp" target="_blank">
              <Twitter size={24} />
            </Link>
            <Link href="https://www.instagram.com/starteknp/" target="_blank">
              <Instagram size={24} />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCZ9yNb94w_SFsz7rQ1LGkyw"
              target="_blank"
            >
              <Youtube size={24} />
            </Link>
          </div>
          <Link
            href="/policy"
            target="_blank"
            className="flex items-center justify-center hover:underline md:justify-start"
          >
            Terms and Policy
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default Footer;
