import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNuber: "",
    password: "",
    role: "",
    file: "",
  });
  const changeeventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changefilethandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNuber", input.phoneNuber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/formData",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
   
    // setInput({ ...input, file: e.target.files?.[0] });
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submithandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Ankush"
              value={input.fullname}
              name="fullname"
              onChange={changeeventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Ankushkumar@gmail.com"
              value={input.email}
              name="email"
              onChange={changeeventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Number</Label>
            <Input
              type="number"
              placeholder="789451231"
              value={input.phoneNuber}
              name="phoneNuber"
              onChange={changeeventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeeventhandler}
            />
          </div>
          <div className="flex items-center justify-center">
            <RadioGroup className="flex items-center gap-4 my-5 pr-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeeventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeeventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div> </div>
            <div className="flex items-center  gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changefilethandler}
              />
            </div>
          </div>
          <Button type="submit" className="w-full my-4 bg-[#00B34A]">
            signup
          </Button>
          <span className="text-sm">
            already have an account?{" "}
            <Link to="/login" className="text-[#00B34A]">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};
export default Signup;
