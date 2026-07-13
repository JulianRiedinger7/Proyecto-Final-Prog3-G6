interface StatsCardProps {
  titulo: string;
  valor: number;
}

export const StatsCard = ({ titulo, valor }: StatsCardProps) => {
  return (
    <div className="bg-secondary text-primary p-6 rounded-lg shadow-md m-4 w-64 font-semibold hover:bg-accent transition-colors duration-300  hover:text-secondary uppercase">
      <h3 className="text-xs mb-2">{titulo}</h3>
      <p className="text-3xl mt-5">{valor}</p>
    </div>
  );
};
