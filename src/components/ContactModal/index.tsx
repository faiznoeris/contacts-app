import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import ContactForm from '../ContactForm';

import ContentWrapper from './components/ContentWrapper';

interface ContactModalProps {
    handleClose: () => void;
    open: boolean;
    id: string | null;
}

const ContactModal = (props: ContactModalProps) => {
    const { handleClose, open, id } = props;
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <ContentWrapper>
                    <ContactForm id={id} handleClose={handleClose} />
                </ContentWrapper>
            </Fade>
        </Modal>
    );
};

export default ContactModal;
