require "test_helper"
class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = {
      user: {
        first_name: "Test",
        last_name: "O'Test",
        id_card: fixture_file_upload('louisiana-id.jpg', 'image/jpeg'),
        birthdate: "2023-06-02",
        about: "Again, a test!",
        email: "test3@test.fr",
        password: "Test3Test3",
        password_confirmation: "Test3Test3"
      }
    }
  end

  test "should create user" do
    assert_difference("User.count") do
      post user_registration_url, params: @user, as: :json
    end

    assert_response :ok
  end
end