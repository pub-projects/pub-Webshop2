import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const VerifyEmailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 15000);
    });

    return (
        <div className="profileWrapper">
            <div>
                <h1>Thank you for registering!</h1>
                <p>A verification email has been sent to your email address.<br />Please, ,verify your email to start using your account.</p><p><em><strong>The Webshop Team</strong></em></p>
            </div>
        </div>
    )
}