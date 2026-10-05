function Header() {
    return (
        <header className="header">
            <div>
                <h2>Dashboard</h2>
                <p>Track your applications and progress.</p>
            </div>

        <div className="header-actions">
            <button type="button">Dark mode</button>
            <button type="button">Add application</button>
        </div>
        </header>
    );
}

export default Header;