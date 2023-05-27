import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { MdAddAlert } from 'react-icons/md';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const AlertComponent = ({ data, sumValue }) => {
  const [recommendation, setRecommendation] = useState('');
  const [recommendationList, setRecommendationList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (data) {
      const latestData = data[data.length - 1];
      const value = latestData.aq;

      if (value >= 1500) {
        setRecommendation("Mauvaise qualité de l'air");
        setRecommendationList([
          "Évitez les activités extérieures.",
          "Portez un masque facial pour réduire l'inhalation de polluants.",
          "Restez dans des espaces intérieurs bien ventilés."
        ]);
      } else if (value > 400 && value < 1500) {
        setRecommendation("Qualité de l'air modérée");
        setRecommendationList([
          "Évitez les activités extérieures intenses.",
          "Restez à l'intérieur si vous ressentez des symptômes d'inconfort.",
          "Consultez votre médecin si les symptômes persistent."
        ]);
      } else {
        setRecommendation("Bonne qualité de l'air");
        setRecommendationList([]);
      }
    }
  }, [data]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {recommendation !== '' && (
        <div>
          <h2>{recommendation}</h2>
          {recommendation !== "Bonne qualité de l'air" && (
            <IconButton onClick={handleDialogOpen} color="primary">
              <MdAddAlert />
            </IconButton>
          )}
        </div>
      )}

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Recommandations</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>{recommendation}</h2>
            {recommendationList.length > 0 ? (
              <ul>
                {recommendationList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Aucune recommandation disponible.</p>
            )}
            {sumValue !== null && (
              <p>La somme des valeurs est de : {sumValue}</p>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlertComponent;