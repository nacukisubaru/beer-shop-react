import Header from "../../app/components/Header/Header";
import SnacksList from "../../app/components/Products/Snacks/SnacksList";

export default function Snacks () {
    return (
        <div className="page-container">
            <Header />
            <SnacksList />
        </div>
    );
}