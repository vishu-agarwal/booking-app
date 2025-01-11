interface HeadingProps {
    title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
    return (
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            {title}
        </h1>
    );
};

export default Heading;