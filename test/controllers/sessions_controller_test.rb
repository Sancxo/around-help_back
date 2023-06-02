require "test_helper"
class SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should create session" do
    post user_session_url, params: {user: {email: @user.email, password: "Test"}}, as: :json
    assert_response :ok
  end
end