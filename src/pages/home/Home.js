// components
import Carousel from 'react-bootstrap/Carousel'

// images
import Img1 from '../../assets/img1.jpg'
import Img2 from '../../assets/img2.jpg'
import Img3 from '../../assets/img3.jpg'

// styles
import "./Home.css"

export default function Home() {
    return (
        <>
            <Carousel variant="dark" className="home-carousel">
                <Carousel.Item>
                    <img className="d-block w-100" src={Img1} alt="First slide" />
                    <Carousel.Caption>
                        <h3>Welcome to Pets Blog!</h3>
                        <p>A blog dedicated entirely to our friends from the animal kingdom.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img className="d-block w-100" src={Img2} alt="Second slide" />
                    <Carousel.Caption>
                        <h3>Your pet's a star!</h3>
                        <p>Share your favorite moments with your pet for others to enjoy as well.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img className="d-block w-100" src={Img3} alt="Third slide" />
                    <Carousel.Caption>
                        <h3>Every pet has a story</h3>
                        <p>Sign up to tell your pet's story.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}
