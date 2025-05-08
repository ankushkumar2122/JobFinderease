import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { createBrowserRouter, Link } from "react-router-dom";
import { LogIn, LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

const Navbar = () => {
  const user = false;

  return (
    <div className="bg-black">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold  text-white">
            JOB <span className="text-[#00B34A]">FINDER</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="text-white flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="outline">login</Button>
            </Link>
            <Link to="/signup">
              {" "}
              <Button
                variant="outline"
                className="bg-[#00B34A] hover:bg-[#00B34A]"
              >
                signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="w-9 h-9 cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="rounded-full object-cover"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 ">
              <div className="flex gap-4 my-7  space-y-3">
                <Avatar className="w-9 h-9  cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full object-cover"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">Ankush kumar</h4>
                  <p className="text-sm text-muted-foreground">hii</p>
                </div>
              </div>
              <div className="flex flex-col  my-2 ">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2 />
                  <Button variant="link">view Profile</Button>
                </div>

                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button variant="link">logout</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
export default Navbar;

{
  /* <nav class="bg-gradient-to-r from-[#0B7B3E] to-[#036937] text-white py-4 shadow-md">
  <div class="container mx-auto px-4 flex items-center justify-between">
    <div class="text-2xl font-bold">JOB FINDER</div>
    <ul class="hidden md:flex space-x-8 text-white font-medium">
      <li><a href="#" class="hover:text-gray-200">Home</a></li>
      <li><a href="#" class="hover:text-gray-200">Jobs</a></li>
      <li><a href="#" class="hover:text-gray-200">About Us</a></li>
      <li><a href="#" class="hover:text-gray-200">Contact Us</a></li>
    </ul>
    <div class="flex space-x-4">
      <button class="border border-white rounded-lg px-4 py-1 hover:bg-white hover:text-green-800 transition">Login</button>
      <button class="bg-white text-green-800 rounded-lg px-4 py-1 font-semibold hover:bg-green-100 transition">Register</button>
    </div>
  </div>
</nav> */
}
