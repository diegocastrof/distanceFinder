import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import MainForm from "components/MainForm";
import ResultModal from "components/ResultModal";

const Main: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 mb-3">DistanceFinder</h1>
      <h2 className="text-xl font-bold text-red-600 mb-3">
        ¡Find the distance between two given address!
      </h2>
      <div className="flex justify-end self-end">
        <Link
          className="underline text-red-600 hover:text-red-800 transition-colors duration-200"
          to="/results"
        >
          See previous results
        </Link>
      </div>
      <MainForm openModal={handleOpenModal} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Result Modal"
        shouldCloseOnEsc={true}
        closeTimeoutMS={200}
      >
        <ResultModal closeModal={handleModalClose} />
      </Modal>
    </>
  );
};

export default Main;
