import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './index.scss';

// Main component (will eventually use all the others)
const App = () => {
  return (
    <Container fluid>
      <MainView />
    </Container>
    // <Card className="text-center">
    //   <Card.Header>KRAFTFLIX</Card.Header>
    //   <Card.Body>
    //     <Container>
    //       <MainView />
    //     </Container>
    //   </Card.Body>
    //   <Card.Footer className="text-muted">2 days ago</Card.Footer>
    // </Card>
  );
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
