import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import chartAPI from "../../api/chart-api";
import { get } from "../../api/requester";
//import { getAllCharts, getOneChart } from "../../hooks/chartHooks";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../modal/ConfirmDelete";
import attachmentAPI from "../../api/attachment-api";
import { useForm } from "../../hooks/useForm";
import UploadForm from "../upload/UploadForm";
import { motion } from "framer-motion";
import {
  useGetAttachments,
  useCreateAttachment,
} from "../../hooks/useAttachments";
import Chart from "./Chart";

const initialValues = {
  attachment: "",
};

export default function ChartDetails() {
  const { chartId } = useParams();
  // const [chart, setChart] = getOneChart(chartId);
  
  const [chart] = [
    {
      _id: 1,
      data: {
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [
          {
            label: "Income",
            data: [20000, 30000, 25000, 40000, 60000],
            borderColor: "rgb(75, 192, 192)",
          },
        ],
      },
      options: {},
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [attachment, setAttachment] = useState("");
  const { email, userId } = useAuthContext();
  const { isAuthenticated } = useAuthContext();
  const [attachments, setAttachments] = useGetAttachments(chartId);
  const isOwner = chart.userId === userId;
  const navigate = useNavigate();

  const chartDeleteHandler = async () => {
    setShowModal(true);
    /*
    const isConfirmed = confirm(
      `Are you sure you want to delete the chart with title ${chart.title}?`
    );
    if (!isConfirmed) {
      return;
    }
    */
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      const response = await chartAPI.remove(chartId);
      console.log(response);
      navigate("/charts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="chart-details">
      <Chart key={chart._id} {...chart} />
      {isOwner && (
        <div className="buttons">
          <Link
            to={`/charts/${chart._id}/edit`}
            className="button"
            id="edit-button"
          >
            Edit
          </Link>

          <Link
            onClick={chartDeleteHandler}
            className="button"
            id="delete-button"
          >
            Delete
          </Link>
        </div>
      )}
      <ConfirmDelete
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      {
        <div className="attachments">
          {attachments.length > 0 && (
            <ul className="img-container">
              <h2>Attachments</h2>
              {attachments.map((doc) => (
                <motion.li
                  className="img-item"
                  key={doc._id}
                  layout
                  whileHover={{ opacity: 1 }}
                >
                  <motion.img
                    className="mot-img"
                    src={doc.url}
                    alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      }
      {isAuthenticated && (
        <article className="add-attachment">
          <h2>Attachment file</h2>
          <UploadForm setAttachments={setAttachments} />
        </article>
      )}
    </div>
  );
}
