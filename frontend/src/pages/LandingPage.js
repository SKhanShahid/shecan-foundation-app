import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const goToDonationPage = () => {
        navigate('/donate');
    };

    const goToVolunteer = () => {
        alert('Thank you for your interest in volunteering! This feature is coming soon.');
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>SheCan Foundation</h1>
            <p>Empowering women and girls through education and opportunity.</p>

            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <button onClick={goToVolunteer} style={{ padding: '10px 20px', fontSize: '1rem' }}>
                    Volunteer
                </button>
                <button onClick={goToDonationPage} style={{ padding: '10px 20px', fontSize: '1rem' }}>
                    Donate
                </button>
            </div>

            <section style={{ marginTop: '4rem', maxWidth: '800px', margin: 'auto' }}>
                <h2>Our Mission</h2>
                <p>
                    We believe in a world where every woman and girl has the chance to reach their full potential.
                    Through education, skill-building, and community support, we provide the tools needed to break cycles of poverty and inequality.
                </p>
            </section>

            <section style={{ marginTop: '4rem', maxWidth: '800px', margin: 'auto' }}>
                <h2>Testimonials</h2>
                <p>"The SheCan Foundation changed my life. I'm now a proud graduate with a job I love!" - A happy graduate</p>
            </section>
        </div>
    );
};

export default LandingPage;