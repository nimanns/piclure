export default function likeCountFormatter(likeCount: number): string {
  let formattedCount:number;
  if (likeCount <= 999) {
    return likeCount + "";
  } else if (likeCount >= 1000 && likeCount <= 999999) {
    formattedCount = likeCount / 1000;
    return formattedCount.toFixed(1) + "k";
  } else if (likeCount >= 1000000 && likeCount <= 999999999) {
    formattedCount = likeCount / 1000000;
    return formattedCount.toFixed(1) + "m";
  } else {
    formattedCount = likeCount / 1000000000;
    return formattedCount.toFixed(1) + "b";
  }
}
