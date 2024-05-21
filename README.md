# BlockAcademy

BlockAcademy is a blockchain-based classroom management system designed to facilitate attendance tracking, student management, posting announcements, and managing assignments within a blockchain environment.

## Features

1. **Attendance Tracking**: Utilize blockchain technology to securely record and monitor student attendance.
2. **Student Management**: Easily manage enrolled students and their information.
3. **Announcement Posting**: Post announcements, updates, and discussion topics to keep students and instructors informed.
4. **Assignment Management**: Create, distribute, and track assignments efficiently using blockchain.

## Technologies Used

- **Solidity**: Smart contract language for Ethereum blockchain development.
- **Truffle**: Ethereum development framework for testing, deployment, and management of smart contracts.
- **Ganache**: Personal blockchain for local Ethereum development and testing.
- **JavaScript (Node.js and Frontend)**: Used for backend development, web interface, and interaction with smart contracts.

## Getting Started

Follow these steps to set up and run BlockAcademy locally:

### Prerequisites

- Node.js and npm installed on your machine.
- Truffle installed globally (`npm install -g truffle`).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/BlockAcademy.git
    ```

2. Navigate to the project directory:

    ```bash
    cd BlockAcademy
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Usage

1. Compile the smart contracts:

    ```bash
    truffle compile
    ```

2. Migrate the contracts to your local blockchain (Ganache):

    ```bash
    truffle migrate
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Access BlockAcademy in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository on GitHub.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## Note: 
This isn't the final version it has many things hardcoded.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
