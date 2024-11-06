import img from "../assets/images/astroImg.png"
import img2 from "../assets/images/home/headImg.png"
import Icons from '../components/ui/Icons';
const Notifications = () => {
    const notifications = [
        {
            id: 1,
            astroName: "Pandit Ji",
            message: "Pandit Ji, added a post, which you want to see, take a look.",
            date: "21 September 2024",
            time: "15:00",
            profileImg: img,
            type: "post",
            postImage: img2
        },
        {
            id: 2,
            astroName: "Rishivar",
            message: "Rishivar Has Introduced New Coupon For You! - GETFLAT150",
            date: "21 September 2024",
            time: "15:00",
            icon: Icons.percentage(),
            type: "coupon",
        },
        {
            id: 3,
            astroName: "Pandit Ji",
            message: "Pandit Ji, added a post, which you want to see, take a look.",
            date: "21 September 2024",
            time: "15:00",
            profileImg: img,
            type: "post",
            postImage: img2
        },
        {
            id: 4,
            astroName: "Pandit Ji",
            message: "Pandit Ji, added a post, which you want to see, take a look.",
            date: "20 September 2024",
            time: "15:00",
            profileImg: img,
            type: "post",
            postImage: img2,
        },
    ];

    const groupedNotifications = notifications.reduce((groups, notification) => {
        const date = notification.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
    }, {});

    return (
        <div className="container my-4">
            {Object.entries(groupedNotifications).map(([date, notifications], index) => (
                <div key={index} className="mb-4">
                    <h5 className="text-muted">{index === 0 ? "Today" : date === "21 September 2024" ? "Yesterday" : date}</h5>

                    {notifications.map((notification) => (
                        <div key={notification.id} className="d-flex align-items-center mb-3 p-2   border-bottom border-dark mx-1 ">
                            {notification.type === "post" ? (
                                <img
                                    src={notification.profileImg}
                                    alt={notification.astroName}
                                    className="rounded-circle me-3"
                                    style={{ width: "50px", height: "50px" }}
                                />

                            ) : notification.type === "coupon" ? (

                                <>
                                    {Icons.percentage("fs-99 ms-2 me-4")}
                                </>
                            ) : null}


                            <div className="flex-grow-1">
                                <p className="mb-1">
                                    <strong>{notification.astroName}</strong> {notification.message}
                                </p>
                                <small className="text-muted">
                                    {notification.date} {notification.time}
                                </small>
                            </div>

                            {notification.type === "post" ? (
                                <img
                                    src={notification.postImage}
                                    alt="Post Preview"
                                    className="rounded-3"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            ) : notification.type === "coupon" ? (
                                <div className="  d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px" }}>
                                    {Icons.arrowCircle("fs-5")}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Notifications;