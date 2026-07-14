import "./SearchBar.css";

export default function SearchBar() {
    return (
        <div className="search-box">

            <label>Quick Search</label>

            <input
                type="text"
                placeholder="Search by name, ID, or email..."
            />

        </div>
    );
}