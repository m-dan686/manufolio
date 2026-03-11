import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./contact.css";

export default function Contact() {
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const cursorRef = useRef(null);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/contact/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                })
            });
            if (response.ok) {
                setSent(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                console.error("Error sending message");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Wrapped in context for React Strict Mode safety
        let ctx = gsap.context(() => {
            gsap.from([leftRef.current, rightRef.current], {
                opacity: 0,
                y: 40,
                duration: 0.9,
                stagger: 0.2,
                ease: "power2.out",
            });
        });

        // Cursor glow
        const move = (e) => {
            gsap.to(cursorRef.current, {
                x: e.clientX - 40,
                y: e.clientY - 40,
                duration: 0.3,
                ease: "power2.out",
            });
        };
        window.addEventListener("mousemove", move);

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", move);
            ctx.revert();
        };
    }, []);

    return (
        <section className="contact-section">
            <div className="contact-wrapper">
                {/* LEFT */}
                <div ref={leftRef} className="contact-left">
                    <h2>
                        Let’s <span className="orange">Collaborate</span>
                    </h2>

                    <h3>
                        Get In <span className="green">Touch</span>
                    </h3>

                    <p className="subtitle">
                        Let’s build something impactful together.
                    </p>

                    <div className="info">
                        <div className="info-item">
                            <span className="icon">📞</span>
                            <div>
                                <small>PHONE: </small>
                                <a href="tel:9342770249" className="contact-link">9342770249</a>
                            </div>
                        </div>

                        <div className="info-item">
                            <span className="icon">✉️</span>
                            <div>
                                <small>EMAIL: </small>
                                <a href="mailto:43manuanandan12a@gmail.com" className="contact-link">43manuanandan12a@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div ref={rightRef} className="contact-right">
                    {!sent ? (
                        <form onSubmit={handleSubmit}>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={6}
                                className="min-h-[180px] resize-none"
                                placeholder="How can I help you?"
                                required
                            />
                            <button type="submit">Send Message</button>
                        </form>
                    ) : (
                        <div className="success">
                            <div className="check">✓</div>
                            <p>Message Sent Successfully</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CURSOR GLOW */}
            <div ref={cursorRef} className="cursor-glow" />
        </section>
    );
}
