import scheduleLogo from "./images/daily-schedule-icon.png";

export default function Header() {
    return (
        <header>
            <img src={scheduleLogo}/>
            <h1>Schedule generator</h1>
        </header>
    )
}