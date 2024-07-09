import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: "A-0002",
  //     password: "ami123",
  //   },
  // });

  const defaultValues = {
    userId: "A-0002",
    password: "ami123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const tostId = toast.loading("Loding..");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      console.log(userInfo);
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      console.log(user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successful", { id: tostId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("something went wrong!", { id: tostId, duration: 2000 });
    }
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="User ID" />

        <PHInput type="text" name="password" label="password" />

        <Button htmlType="submit"> Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
