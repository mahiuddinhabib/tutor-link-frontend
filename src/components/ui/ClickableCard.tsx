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
        hoverable
        style={{
          minHeight: "400px",
          maxWidth: 500,
          // border:"1px solid gray",
          // boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.3)",
          margin: "0 auto",
        }}
        cover={
          <Image
            src={service?.coverImg || CardImg}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="card image"
            // width={300}
            // style={{ height: "auto" }}
            // alt="card image here"
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
