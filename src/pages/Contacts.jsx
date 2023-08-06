import { Loader } from "components"
import { ContactList } from "components/ContactList"
import { ContactForm } from "components/ContactsForm"
import { useSelector } from "react-redux"
import { selectIsLoading } from "redux/selectors"
import { Filter } from "components/Filter"
import { Helmet } from "react-helmet-async"

const Contacts = () => {
    const isLoading = useSelector(selectIsLoading)
    return (
        <>
            <Helmet>
                <title>
                    Contacts
                </title>
            </Helmet>
            <ContactForm/>
            <Filter/>
            {!isLoading 
                ? <ContactList/> 
                : <Loader/>}
        </>
    )
}

export default Contacts