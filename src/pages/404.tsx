import { RedirectionButton } from '../components/RedirectionButton';

export default function Error404() {
    return (
        <>
        <div className="w-full min-h-screen grid items-center justify-center">
            <div className="bg-linear-to-b from-white-2 to-black-8 rounded-2xl shadow-outer border border-accent-alpha w-full max-w-xl p-8 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-8 text-contrast">404 - Page Not Found</h1>
                <img src="" alt="" className='w-35 h-35 mb-4' />
                <p className="text-contrast mb-8 text-center">Sorry, the page you are looking for does not exist or has been moved.</p>
                <RedirectionButton buttonName='Go Home' buttonLink='/' buttonColor='primary' className="w-fit" />
            </div>
        </div>
        </>
    )
}