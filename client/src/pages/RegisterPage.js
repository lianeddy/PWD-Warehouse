import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { apiUrl_user } from '../helpers';
import { authRegisterAction } from '../redux/actions';

const RegisterPage = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [securityQuestion, setSecurityQuestion] = useState([]);
  const [securityAnswer, setSecurityAnswer] = useState(null);
  const [securityQuestionId, setSecurityQuestionId] = useState(1);
  const dispatch = useDispatch();
  useEffect(async () => {
    const response = await axios.get(`${apiUrl_user}/get-security-question`);
    setSecurityQuestion(response.data);
  }, []);

  const handleRegisterBtn = () => {
    const payload = {
      username,
      email,
      password,
      full_name: name,
      security_answer: securityAnswer,
      security_question_id: securityQuestionId,
    };
    dispatch(authRegisterAction(payload));
  };
  return (
    <Form onSubmit={handleRegisterBtn}>
      <FormGroup>
        <Label>username</Label>
        <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>name</Label>
        <Input type="text" placeholder="your name" onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Select question</Label>
        <Select
          options={securityQuestion}
          defaultValue={{ label: 'Siapa nama hewan peliharaan pertama Anda?', value: 1 }}
          onChange={(e) => setSecurityQuestionId(e.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          placeholder="anwser"
          onChange={(e) => setSecurityAnswer(e.target.value)}
        />
      </FormGroup>
      <Button onClick={handleRegisterBtn}>Submit</Button>
    </Form>
  );
};

export default RegisterPage;
