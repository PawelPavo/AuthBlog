import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { setStorage } from '../../utils/api-services';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const LogIn: React.FC<LogInProps> = (props) => {
    const history = useHistory();
    const { state } = useLocation<{ msg: string }>();
    const [values, setValues] = React.useState<{ [key: string]: string }>({
        email: 'test10@test10.com',
        password: "password12345"
    });

    const [error, setError] = React.useState<string>('')

    React.useEffect(() => {
        setError(state?.msg)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    };

    const handleLogin = async () => {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (res.ok) {
            const info = await res.json();
            setStorage(info.token, info.role);
            history.push('/admin');
        }
    }

    return (
        <Row className="mt-5 justify-content-center">
            <Col md={8}>
                <Form className="border rounded-lg p-3">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={values.email || ''}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            size="lg"
                            className="my-2"
                            placeholder="sample@email.com"
                            autoComplete="email"
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            value={values.password || ''}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            size="lg"
                            className="my-2"
                            placeholder="Sample Password"
                            autoComplete="current-password"
                        />
                    </Form.Group>
                    <Button onClick={handleLogin} className="w-50 mx-auto" block size="lg">
                        Login
                    </Button>
                </Form>
                {error && <Alert variant="danger">{error}</Alert>}
            </Col>
        </Row>
    )
}

interface LogInProps { }

export default LogIn;