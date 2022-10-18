import Container from 'react-bootstrap/Container'
import PixelatedImage from './PixelatedImage'


export default function Cover({ coverUrl, pixelSize, pixelizeEnabled }) {


    return (
        <>
            <Container className="rounded-3 bg-dark p-3" style={{ height: '50vh' }}>
                <PixelatedImage
                    src={coverUrl}
                    size={pixelSize}
                    enabled={pixelizeEnabled}
                />
            </Container>
        </>
    )
}
