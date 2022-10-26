import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function ToastNotification({ gameWon, gameLost, header, body }) {
    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);

    return (
        <div>
            <ToastContainer position="bottom-end" className="p-3">
                <Toast show={show} onClose={toggleShow}>
                    <Toast.Header>
                        {/* If the game was lost tell that in the header */}
                        {gameLost && <strong className="me-auto">Game Over</strong>}
                        {/* If the game was won tell that in the header */}
                        {gameWon && <strong className="me-auto">You Won!</strong>}
                        {/* If the user lost health tell the user they were incorrect in the header */}
                        {!gameWon && !gameLost && <strong className="me-auto">Incorrect</strong>}
                        <strong className="me-auto">{ }</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>See? Just like this.</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
