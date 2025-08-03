import Hero from '@/components/Hero'
import PremiumShowcase from '@/components/PremiumShowcase'
import CustomerTestimonials from '@/components/CustomerTestimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

const Home = () => {
    return (
        <div>
        <Hero />
        <PremiumShowcase />
        <CustomerTestimonials />
        <Newsletter />
        <Footer />
        </div>
    )
}

export default Home