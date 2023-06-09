import {
	Box,
	Button,
	FormControl,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { BiDollar } from 'react-icons/bi';
import { BsCart4 } from 'react-icons/bs';
import { TbShoppingCart } from 'react-icons/tb';
import { ActionObjectType, StateObjectType } from '../utils/reducer';
import InputModal from './InputModal';

type UserInputProps = {
	todoInputs: StateObjectType['todoInputs'];
	isEditing: StateObjectType['isEditing'];
	dispatch: React.Dispatch<ActionObjectType>;
};

function UserInput({ isEditing, todoInputs, dispatch }: UserInputProps) {
	const inputIconColor = useColorModeValue('gray.700', 'white');
	const inputBoxShadow = useColorModeValue('var(--shadow)', 'var(--shadow-dark)');
	const borderAppearance = useColorModeValue('none', 'solid 1px #20334b');
	const { onOpen, isOpen, onClose } = useDisclosure();
	const idRef = useRef(1);

	const todoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		dispatch({ type: 'SET_TODO_INPUTS', productKey: name, productValue: value });
	};

	const addTodoHandler = (event: React.FormEvent<HTMLDivElement>) => {
		event.preventDefault();

		if (todoInputs.todoProduct.length >= 3) {
			dispatch({ type: 'ADD_TODO_ITEM', id: (idRef.current += 1) });
			dispatch({ type: 'CLEAR_TODO_INPUTS' });
		} else {
			onOpen();
		}
	};

	const updateHandler = (event: React.FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		dispatch({ type: 'UPDATE_TODO_ITEM' });
		dispatch({ type: 'SET_EDIT_STATE', isEditing: false });
		dispatch({ type: 'CLEAR_TODO_INPUTS' });
	};

	return (
		<Box className="form-wrapper" px={'1.6rem'} w={{ base: 'min(100%, 37rem)', md: '100%' }}>
			<FormControl
				as={'form'}
				mt={'2rem'}
				display={'flex'}
				flexDirection={'column'}
				alignItems={'center'}
				gap={'2rem'}
				padding={'1.5rem 1.6rem 4rem'}
				boxShadow={inputBoxShadow}
				onSubmit={isEditing ? updateHandler : addTodoHandler}
			>
				<Heading
					fontSize={'2.7rem'}
					color={'blue.600'}
					mt={'2.5rem'}
					display={'flex'}
					alignItems={'center'}
					gap={'1rem'}
				>
					Shopping List
					<BsCart4 />
				</Heading>
				<InputGroup>
					<InputLeftElement
						color={inputIconColor}
						pointerEvents="none"
						fontSize="1.2em"
						height={'100%'}
						width={'2.8rem'}
					>
						<TbShoppingCart />
					</InputLeftElement>
					<Input
						border={borderAppearance}
						name={'todoProduct'}
						value={todoInputs.todoProduct}
						onChange={todoInputHandler}
						type="text"
						placeholder={'What do you want to buy?'}
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						paddingBlock={'2.2rem'}
						pl={'2.8rem'}
						boxShadow={'var(--shadow)'}
						fontSize={'1.4rem'}
					/>
				</InputGroup>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						fontSize="1.2em"
						height={'100%'}
						color={inputIconColor}
					>
						<BiDollar />
					</InputLeftElement>
					<Input
						border={borderAppearance}
						name={'todoPrice'}
						value={todoInputs.todoPrice}
						onChange={todoInputHandler}
						type="number"
						paddingBlock={'2.2rem'}
						boxShadow={'var(--shadow)'}
						placeholder="Enter price"
						_placeholder={{ fontWeight: 'bold', fontStyle: 'italic' }}
						fontSize={'1.4rem'}
						fontWeight={'bold'}
					/>
				</InputGroup>

				<Button
					colorScheme={'blue-btn'}
					color={'white'}
					py={'1.84rem'}
					px={'1.3rem'}
					fontSize={'1.5rem'}
					_active={{ transform: 'scale(0.98)' }}
					alignSelf={'start'}
					type={'submit'}
				>
					{isEditing ? 'Edit Item' : 'Add Item'}
				</Button>
				{isOpen && <InputModal {...{ onClose, isOpen }} />}
			</FormControl>
		</Box>
	);
}

export default UserInput;