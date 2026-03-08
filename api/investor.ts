export default async function handler(req, res) {

  const { question } = req.body;

  let answer = "";

  if (question?.toLowerCase().includes("roi")) {
    answer =
      "Average ROI for villas in Zanzibar ranges between 8% and 15% depending on location and tourism demand.";
  } 
  else if (question?.toLowerCase().includes("areas")) {
    answer =
      "Top areas for rental returns include Paje, Nungwi, Kendwa and Matemwe.";
  } 
  else {
    answer =
      "Zanzibar is one of East Africa's fastest growing property investment destinations due to tourism growth and limited beachfront land.";
  }

  res.status(200).json({ answer });
}
