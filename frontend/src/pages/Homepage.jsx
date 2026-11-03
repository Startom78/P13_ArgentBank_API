import './homepage.css'
import iconChat from '../assets/icon-chat.png'
import iconMoney from '../assets/icon-money.png'
import iconSecurity from '../assets/icon-security.png'

const features = [
    {
        icon: iconChat,
        alt: 'Chat Icon',
        title: 'You are our #1 priority',
        text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
    },
    {
        icon: iconMoney,
        alt: 'Money Icon',
        title: 'More savings means higher rates',
        text: 'The more you save with us, the higher your interest rate will be!'
    },
    {
        icon: iconSecurity,
        alt: 'Security Icon',
        title: 'Security you can trust',
        text: 'We use top of the line encryption to make sure your data and money is always safe.'
    }
]

function HomePage() {
    return (
        <>
            <div className="hero">
                <section className="hero-content">
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>

            <section className="features">
                {features.map((feature) => (
                    <div className="feature-item" key={feature.title}>
                        <img src={feature.icon} alt={feature.alt} className="feature-icon" />
                        <h3 className="feature-item-title">{feature.title}</h3>
                        <p>{feature.text}</p>
                    </div>
                ))}
            </section>
        </>
    )
}

export default HomePage
