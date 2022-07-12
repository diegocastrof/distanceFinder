import { useState } from "react";
import Modal from "react-modal";
import MainForm from "components/MainForm";
import ResultModal from "components/ResultModal";
import { AddressData } from "models";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fromAddressData, setFromAddressData] = useState<AddressData | null>(
    null,
  );
  const [toAddressData, setToAddressData] = useState<AddressData | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 mb-3">DistanceFinder</h1>
      <h2 className="text-xl font-bold text-red-600 mb-3">
        ¡Find the distance between two given address!
      </h2>
      <MainForm
        setFromAddressData={setFromAddressData}
        setToAddressData={setToAddressData}
        setIsModalOpen={setIsModalOpen}
      />
      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterModalOpenHandler}
        onRequestClose={handleModalClose}
        contentLabel="Result Modal"
        shouldCloseOnEsc={true}
        closeTimeoutMS={200}
      >
        <ResultModal
          fromAddressData={fromAddressData as AddressData}
          toAddressData={toAddressData as AddressData}
          closeModal={handleModalClose}
        />
      </Modal>
    </>
  );
};

export default Main;
