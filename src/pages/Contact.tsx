import NavBar from '@/components/Header';
import ContactUs from '@/components/ContactUs';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
// import FAQSection from '@/components/BathroomGallery';
const Contact = () => {
    return(
        <div>
            <ContactUs />
            {/* <FAQSection /> */}
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Contact;