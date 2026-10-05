function StatCard({label, value}) {
    return (
        <div className="card-wrapper">
            <p>{label}</p>
            <span>{value}</span>
            
        </div>
    );
}

export default StatCard;