import clsx from 'clsx';

export const Container = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<section className={clsx('flex flex-col p-6 md:p-12 gap-5', className)}>{children}</section>
	);
};
