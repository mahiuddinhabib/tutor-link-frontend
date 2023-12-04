import { Avatar, Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import CardImg from "@/assets/common-card-img.jpeg";

const { Meta } = Card;

const ClickableCard = ({ service }: { service: any }) => {
  // const {href, service} = props;
  // console.log(service);
  return (
    <Link href={`/service/${service?.id}`}>
      <Card
        style={{
          minHeight: "400px",
          // width:"350px",
          boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.3)",
        }}
        cover={
          <Image
            width={300}
            style={{ height: "auto" }}
            src={CardImg}
            alt="card image here"
          />
        }
      >
        <Meta
          title={service?.title}
          description={
            <>
              This {service?.title} is a {service?.subject?.title} course
              conducted by {service?.tutor?.name}
            </>
          }
        />
      </Card>
    </Link>
  );
};

export default ClickableCard;
