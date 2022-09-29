import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const changeFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const changeLastName = (e) => {
    setLastName(e.target.value)
  }
  const changeUsername = (e) => {
    setUsername(e.target.value)
  }
  const changeEmail = (e) => {
    setEmail(e.target.value)
  }
  const changePassword = (e) => {
    setPassword(e.target.value)
  }
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const register = async (e) => {
    e.preventDefault();

    const user = await publicRequest.post('/auth/register', {
      username: userName,
      email,
      password
    })

    if (user.data) navigate('/login')
    console.log('Registered user', user)


  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" value={firstName} onChange={changeFirstName}/>
          <Input placeholder="last name" value={lastName} onChange={changeLastName}/>
          <Input placeholder="username" value={userName} onChange={changeUsername} />
          <Input placeholder="email" value={email} onChange={changeEmail}/>
          <Input placeholder="password" value={password} onChange={changePassword}/>
          <Input placeholder="confirm password" value={confirmPassword} onChange={changeConfirmPassword}/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={register}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;