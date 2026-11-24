import './user.css'

const accounts = [
    { title: 'Argent Bank Checking (x8349)', description: 'Available Balance' },
    { title: 'Argent Bank Savings (x6712)', description: 'Available Balance' },
    { title: 'Argent Bank Credit Card (x8349)', description: 'Current Balance' },
]

function User() {
    return (
        <div className="user-page">
            <div className="user-header">
                <h1 className="user-title">
                    Welcome back
                    <br />
                    Amaury le Grand!
                </h1>
                <button type="button" className="edit-button">Edit Name</button>
            </div>

            <h2 className="sr-only">Accounts</h2>

            {accounts.map((account) => (
                <section className="account" key={account.title}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{account.title}</h3>
                        <p className="account-amount">à coder de manière dynamique plus tard</p>
                        <p className="account-amount-description">{account.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button type="button" className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </div>
    )
}

export default User
