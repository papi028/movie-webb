import { TextToggleMore } from "components/Text";
import styles from "./watchSummary.module.scss";

interface WatchSummaryProps {
  introduction: string;
}

const WatchSummary = ({ introduction }: WatchSummaryProps) => {
  return (
    <div className={styles.summary}>
      <h4 className={styles.label}>Summary :</h4>
      <TextToggleMore>{introduction}</TextToggleMore>
    </div>
  );
};

export default WatchSummary;
