import "./Pagination.css"
const Pagination = ({ next, prev, onPageChange }) => {
    return (
        <>
            <section className="pagination-container">
                <ul className="pagination">
                    <li className="page-item">
                        <button className="page-btn" onClick={() => { onPageChange(prev) }} disabled={!prev}>
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </button>
                    </li>
                    <li className="page-item">
                        <button className="page-btn" onClick={() => { onPageChange(next) }} disabled={!next}>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </button>
                    </li>
                </ul>
            </section>
        </>
    );
};

export default Pagination;
