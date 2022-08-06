export default function ProfileModal(props) {
    if (props.token) {
        let firstButton;
        let secondButton;
        
        if (props.token[5] == "admin") {
            firstButton = <a className="profile-modal-button row" href="/edit-settings"> Edit Website Settings </a>;
            secondButton = <a className="profile-modal-button row" href="/all-orders"> View All Orders </a>;
        }
        else {
            firstButton = <a className="profile-modal-button row" href="/edit-profile"> Edit Profile </a>;
            secondButton = <a className="profile-modal-button row" href="/order-history"> Order History </a>;
        }

        return (
            <div id="profile-modal" className="hidden">
                <div id="profile-modal-content">
                    <h3> {props.token[0] + " " + props.token[1]} </h3>
                    <p> Email: {props.token[2]} </p>
                    <p> Phone: {"(" + props.token[3].slice(0, 3) + ") " + props.token[3].slice(3, 6)+ "-" + props.token[3].slice(6, 10)} </p>
                    <i id="close-profile-modal" onClick={props.onClick} className="material-symbols-outlined"> <a> close </a> </i>
                    <div id="profile-modal-buttons" className="grid">
                        {firstButton}
                        {secondButton}
                        <a className="profile-modal-button row" onClick={props.logOut}> Log Out </a>
                    </div>
                </div>
            </div>
        );
    }
}