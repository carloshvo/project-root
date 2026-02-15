interface FeedbackProps {
    loading?: boolean;
    message?: string | null;
}

export default function Feedback({ loading, message }: FeedbackProps) {
    if (loading) {
        return <p>Carregando...</p>; // pode ser substituído por um spinner visual
    }

    if (message) {
        const isError = message.toLowerCase().includes('erro');
        return <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>;
    }

    return null;
}