import "./users.css";
import Link from "next/link";

export default function User(props){
    return (
        <li className="user-item">
            <div className="card user-item__content">
                <Link href={`/users/${props.ID}`}>
                    <div className="user-item__image avatar">
                        <img src={props.Picture} alt="{props.UserName}" />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.UserName}</h2>
                        <h3>{props.Title}</h3>
                    </div>
                </Link>
            </div>
        </li>
    );
}