import axios from "axios";
import { toast } from "sonner"; // or 'react-toastify' if you're using that
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/Constant";

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const changeeventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

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
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="****"
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
          </div>
          <Button type="submit" className="w-full my-4 bg-[#00B34A]">
            Login
          </Button>
          <span className="text-sm">
            don't have an account?{" "}
            <Link to="/signup" className="text-[#00B34A]">
              Signup
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};
export default Login;
