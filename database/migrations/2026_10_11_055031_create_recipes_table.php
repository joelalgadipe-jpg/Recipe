<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('category'); // Ulam, Meryenda, Dessert, Inumin, Iba pa
            $table->unsignedInteger('cook_time')->nullable(); // minuto
            $table->unsignedInteger('servings')->nullable();
            $table->text('ingredients');
            $table->text('steps');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};