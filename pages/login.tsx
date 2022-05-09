import { Alert, AlertIcon, Box, Button, chakra, FormControl, Input, Text } from "@chakra-ui/react";
import CenterContainer from "@components/ui/CenterContainer";
import PasswordInput from "@components/ui/PasswordInput";
import useUser from "@hooks/useUser";
import { User } from "@prisma/client";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export default function Login() {
	const { mutateUser } = useUser({ redirectTo: "/", redirectIfFound: true });
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			const { data } = await axios.post<User>("/api/auth/login", { email, password });
			mutateUser(data);
		} catch (err) {
			setError(err.response.data.error || err.message);
		}
		setLoading(false);
	};

	return (
		<>
			<Head>
				<title>Firefiles - Login</title>
			</Head>
			<CenterContainer>
				<Box
					w="sm"
					px="6"
					py="8"
					borderRadius="md"
					boxShadow="4.1px 4.1px 6.5px -1.7px rgba(0,0,0,0.2)"
				>
					<Text as="h2" fontSize="2xl" align="center" mb="8">
						👋 Login
					</Text>
					{error && (
						<Alert status="error" fontSize="md">
							<AlertIcon />
							{error}
						</Alert>
					)}
					<Box as="form" onSubmit={handleSubmit}>
						<FormControl id="email" my="3">
							<Input
								variant="outline"
								placeholder="Enter your email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</FormControl>
						<FormControl id="password" mb="3">
							<PasswordInput
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<Button
							mb="3"
							colorScheme="green"
							variant="solid"
							isLoading={loading}
							w="full"
							type="submit"
						>
							Login
						</Button>
						<Text as="p" fontSize="xs" align="center">
							Don't have an account?{" "}
							<Link href="/signup">
								<chakra.span textDecor="underline" cursor="pointer">
									Sign Up
								</chakra.span>
							</Link>
						</Text>
						<Text as="p" fontSize="xs" textDecor="underline" cursor="pointer" align="center">
							<Link href="/forgot-password">Forgot Password?</Link>
						</Text>
					</Box>
				</Box>
			</CenterContainer>
		</>
	);
}
