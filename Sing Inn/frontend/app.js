class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', message: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleMusic = this.toggleMusic.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        });

        const data = await response.json();
        this.setState({ message: data.message });
    }

    toggleMusic() {
        const audio = document.getElementById("background-music");
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    render() {
        return (
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>{this.state.message}</p>
                <button onClick={this.toggleMusic}>Toggle Music</button>
                <audio id="background-music" src="E:\OLK\UPATECO\2024\Programacion 3\TPI\Sing Inn\frontend/Eagles - Hotel California.mp3" loop></audio>
            </div>
        );
    }
}

ReactDOM.render(<LoginForm />, document.getElementById('root'));
