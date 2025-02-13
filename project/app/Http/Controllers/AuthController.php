<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;



class AuthController extends Controller
{
    /**
     * Handle login request via backend using database authentication.
     */
    public function login(Request $request)
    {
        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        // Retrieve credentials from the request.
        $credentials = $request->only('email', 'password');

        // Attempt authentication with the credentials against the database.
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user();

        // Check if the user implements MustVerifyEmail and if the email is verified.
        if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail()) {
            return response()->json([
                'success' => false,
                'message' => 'Email not verified'
            ], 409);
        }

        // Generate an API token for token-based authentication.
        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user'    => $user,
            'token'   => $token, // Return the token
        ]);
    }

    /**
     * Register a new user with a hashed password.
     */
    public function register(Request $request)
    {
        // Validate the incoming request data.
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        // Create a new user with the password hashed using Hash::make() (Bcrypt)
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Log the user in immediately after registration.
        Auth::login($user);

        return response()->json([
            'success' => true,
            'user'    => $user,
        ], 201);
    }

    /**
     * Handle a forgot password request and generate a reset token.
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'token' => $token,
                'created_at' => now(),
            ]
        );

        // In a real application, send an email with the reset token.
        return response()->json([
            'success' => true,
            'message' => 'Password reset token generated. Please check your email for reset instructions. (Token: ' . $token . ')'
        ]);
    }

    /**
     * Handle logout request.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }
} 